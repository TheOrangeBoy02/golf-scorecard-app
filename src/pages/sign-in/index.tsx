// src/pages/sign-in/[[...index]].tsx
import { SignIn } from "@clerk/nextjs";
import Layout from "../../components/Layout";

const SignInPage = () => (
  <Layout>
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-primary-500 hover:bg-primary-600',
            card: 'rounded-lg shadow-md',
          },
        }}
      />
    </div>
  </Layout>
);

export default SignInPage;