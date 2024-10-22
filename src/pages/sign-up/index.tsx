// src/pages/sign-up/[[...index]].tsx
import { SignUp } from "@clerk/nextjs";
import Layout from "../../components/Layout";

const SignUpPage = () => (
  <Layout>
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <SignUp 
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

export default SignUpPage;