import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-moss-50 px-4">

      <Card className="w-full max-w-md">

        <h1 className="text-3xl font-bold text-moss-700">
          Register
        </h1>

        <p className="mt-2 text-sm text-ink/60">
          Create your Goal Journal account.
        </p>

        <div className="mt-6 flex flex-col gap-4">

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
          />

          <Button className="w-full">
            Register
          </Button>

        </div>

        <p className="mt-6 text-center text-sm text-ink/60">

          Already have an account?{' '}

          <Link
            to="/login"
            className="font-medium text-moss-700"
          >
            Login
          </Link>

        </p>

      </Card>

    </div>
  );
}