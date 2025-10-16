'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {GraduationCap} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const auth = getAuth();
  const {toast} = useToast();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
       toast({
        title: 'Signup Successful',
        description: "Your account has been created.",
      });
      router.push('/dashboard');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
       <div className="w-full max-w-md p-4">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-bold font-headline text-primary tracking-tight">
              GradeAssist
            </h1>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Create an account to start managing your grades.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                 {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
