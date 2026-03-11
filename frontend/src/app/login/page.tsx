import AuthLayout from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const sideContent = (
    <div className="text-center lg:text-left">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome
        <br />
        to our platform...
      </h2>
      <p className="text-gray-600 text-lg leading-relaxed">
        Lorem faclorul non egestur quis pro nam his
        <br />
        ecurrit dictum nela dictuur. Track your progress
        <br />
        and achieve your study goals with our
        <br />
        comprehensive platform.
      </p>
    </div>
  );

  return (
    <AuthLayout sideContent={sideContent}>
      <LoginForm />
    </AuthLayout>
  );
}