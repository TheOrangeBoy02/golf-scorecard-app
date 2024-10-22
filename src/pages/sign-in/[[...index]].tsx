// src/pages/sign-in/[[...index]].tsx
import { SignIn } from "@clerk/nextjs"
import Layout from "../../components/Layout"

const SignInPage = () => (
  <Layout>
    <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
      <SignIn
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

export default SignInPage