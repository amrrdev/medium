import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import mailConfig from './config/mail.config';
import { MailOptionsInterface } from './interfaces/mail.interface';
import * as crypto from 'crypto';
import { ForgetPasswordDto } from 'src/auth/authentication/dto/forget-password.dto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private resetToken: Map<string, { token: string; expires: Date }> = new Map();
  private otp: Map<string, { otp: string; expires: Date }> = new Map();

  constructor(
    @Inject(mailConfig.KEY) private readonly mailConfigrations: ConfigType<typeof mailConfig>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: mailConfigrations.gmail,
        pass: mailConfigrations.password,
      },
    });
  }

  generateResetToken(forgetPasswordDto: ForgetPasswordDto) {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000);
    this.resetToken.set(forgetPasswordDto.email, { token, expires });
    return token;
  }

  verifyToken(email: string, token: string) {
    const storedToken = this.resetToken.get(email);
    if (!storedToken) return false;
    if (storedToken.expires < new Date()) {
      this.resetToken.delete(email);
      return false;
    }

    return storedToken.token === token;
  }
  generateOTP(forgetPasswordDto: ForgetPasswordDto): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 600000); // OTP expires in 10 minutes
    this.otp.set(forgetPasswordDto.email, { otp, expires });
    return otp;
  }

  verifyOTP(email: string, otp: string): boolean {
    const storedOTP = this.otp.get(email);
    if (!storedOTP) return false;
    if (storedOTP.expires < new Date()) {
      this.otp.delete(email);
      return false;
    }
    return storedOTP.otp === otp;
  }
  async sendEmail(mailOptions: MailOptionsInterface) {
    try {
      await this.transporter.sendMail({
        from: this.mailConfigrations.gmail,
        ...mailOptions,
      });
    } catch (error) {
      console.error('error happens while sending the email: ', error);
      throw error;
    }
  }
}
