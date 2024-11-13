import nodemailer from 'nodemailer';

import { EmailType, MAIL_ID, MAIL_PASSWORD } from '~/common/constants';

// * 이메일 전송
export const sendEmail = async ({
  to,
  code,
  type = EmailType.ETC,
}: {
  to: string;
  code?: string;
  type?: EmailType;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: MAIL_ID,
        pass: MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 이메일 전송 레이아웃
    /**
     * 필요에 따라 커스터마이징 가능
     */
    let mailOptions = {};
    console.log('type', type);
    switch (type) {
      case EmailType.RESET_PASSWORD:
        mailOptions = {
          subject: '[NestJS Starter] 비밀번호 재설정 안내',
          text: '새로 발급된 비밀번호는 다음과 같습니다.',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
              <h2 style="color: #333;">비밀번호 재설정 안내</h2>
              <p>안녕하세요, 회원님.</p>
              <p>새로 발급된 임시 비밀번호는 아래와 같습니다. 로그인 후 반드시 비밀번호를 변경해 주세요.</p>
              <div style="text-align: center; padding: 20px; background-color: #fff; border-radius: 8px; border: 1px solid #ddd;">
                <h3 style="color: #555;">임시 비밀번호: <strong style="color: #ff6b6b;">${code}</strong></h3>
              </div>
              <p>절대로 타인에게 비밀번호를 공유하지 마세요. 보안을 위해 비밀번호를 자주 변경해 주시기 바랍니다.</p>
              <p style="color: #777; font-size: 12px; margin-top: 30px;">이 이메일은 시스템에서 자동으로 발송된 메일입니다. 문의 사항이 있을 경우 고객 지원팀에 연락해 주세요.</p>
            </div>
          `,
        };
        break;
      default:
        mailOptions = {
          subject: '메일 제목',
          text: '메일 텍스트',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
              <h2 style="color: #333;">메일 샘플</h2>
              <p>안녕하세요. 회원님</p>
              <p>샘플 내용은 아래와 같습니다.</p>
              <div style="text-align: center; padding: 20px; background-color: #fff; border-radius: 8px; border: 1px solid #ddd;">
                <h3 style="color: #555;">샘플 내용: <strong style="color: #ff6b6b;">샘플</strong></h3>
              </div>
              <p>이곳에 안내 및 주의 사항 입력</p>
              <p style="color: #777; font-size: 12px; margin-top: 30px;">이 이메일은 시스템에서 자동으로 발송된 메일입니다. 문의 사항이 있을 경우 고객 지원팀에 연락해 주세요.</p>
            </div>
          `,
        };
    }

    await transporter.sendMail({
      from: MAIL_ID,
      to,
      ...mailOptions,
    });
  } catch (error) {
    throw error;
  }
};
