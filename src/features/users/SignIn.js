import React from 'react';
import { Form, redirect } from 'react-router-dom';
import { userService } from './user.service';

export async function loginAction({ request, params }) {
  const formData = await request.formData();
  const userDetails = Object.fromEntries(formData);
  await userService.login(userDetails);
  return redirect('/boards');
}

export default function SignIn() {
  return (
    <div>
      <Form method="post" id="signin-form">
        <p>
          <span>Email address</span>
          <input
            placeholder="Email address"
            aria-label="Email address"
            type="text"
            name="email"
            defaultValue="darryllrobinson@icloud.com"
          />
        </p>
        <p>
          <span>Password</span>
          <input
            placeholder="Password"
            aria-label="Password"
            type="password"
            name="password"
            defaultValue="newpassss"
          />
        </p>
        <button type="submit">Sign In</button>
      </Form>
    </div>
  );
}
