import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-primary">Bioval</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Biomass data management platform
          </p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}