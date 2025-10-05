import { Toaster } from "sonner";

const AuthLayout = async ({children}:{children:React.ReactNode}) => {

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div className='auth-layout'>
      {children}
      <Toaster/>
    </div>
  );
};

export default  AuthLayout;