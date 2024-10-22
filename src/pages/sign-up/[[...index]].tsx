// src/pages/sign-up/[[...index]].tsx
import { SignUp } from "@clerk/nextjs"
import Layout from "../../components/Layout"

const SignUpPage = () => (
  <Layout>
    <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: 
              "bg-primary-500 hover:bg-primary-600 text-white",
            card: "rounded-lg shadow-md"
          }
        }}
      />
    </div>
  </Layout>
)

export default SignUpPage