'use client';

import { FormEvent, useState } from 'react';
import { Button, Form, Input } from '@jho951/ui-components';

import { SignInTemplateProps } from '@/components/templates/auth/auth.ts';
import styles from '@/components/templates/auth/SignIn.module.css';

function SignInTemplate({ title, desc, dividerText = '또는' }: SignInTemplateProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className={styles.main}>
      <section>
        <h1>{title}</h1>
        <p>{desc}</p>

        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={event => setEmail(event.target.value)}
            fullWidth
          />
          <Button type="submit">이메일로 계속하기</Button>
        </Form>

        <p className={styles.dividerText}>{dividerText}</p>

        <div className={styles.socialButtons}>
          <Button type="button" variant="secondary" className={styles.oauth}>
            Google로 계속하기
          </Button>
          <Button type="button" variant="secondary" className={styles.oauth}>
            Kakao로 계속하기
          </Button>
        </div>
      </section>
    </main>
  );
}

export default SignInTemplate;
