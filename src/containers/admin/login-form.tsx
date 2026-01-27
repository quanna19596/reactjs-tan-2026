import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AdminButton from "@/components/admin/admin-button";
import DummyService from "@/services/dummy";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { FieldError } from "@/shadcn/ui/field";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type TLoginFormProps = {};

type TLoginFormValues = z.infer<typeof schema>;

const LoginForm = (props: TLoginFormProps) => {
  const { mutateAsync: login, isPending: isLoggingIn } =
    DummyService.Hook.Auth.useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLoginFormValues) => {
    const { accessToken, refreshToken } = await login(
      { body: data },
      {
        onError: (err) => {
          toast.error(err.response?.data.message);
        },
      },
    );

    DummyService.Utils.storeAccessToken(accessToken);
    DummyService.Utils.storeRefreshToken(refreshToken);
    location.reload();
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="email"
                  disabled={isSubmitting || isLoggingIn}
                  {...register("username")}
                />
                <FieldError>{errors?.username?.message}</FieldError>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  disabled={isSubmitting || isLoggingIn}
                  {...register("password")}
                />
                <FieldError>{errors?.password?.message}</FieldError>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <AdminButton
              type="submit"
              className="w-full"
              disabled={isSubmitting || isLoggingIn}
            >
              Login
            </AdminButton>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;
