"use client";

import { Button, Form, Input, Label } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineError } from "react-icons/md";
import { toast } from "react-toastify";
import { signInSocial, signUp } from "@/lib/actions/auth-actions";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSocialAuth = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError("");
    try {
      const url = await signInSocial(provider);
      window.location.assign(url);
    } catch (err) {
      setError(`Authentication error: ${err instanceof Error ? err.message : "Unknown error"}`);
      toast.error("সাইন আপ সফল হয়নি");
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("পাসওয়ার্ড দুটি মেলেনি!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await signUp({ name, email, password });
      if (!res?.user) {
        setError("অ্যাকাউন্ট তৈরি করা সম্ভব হয়নি।");
        toast.error("সাইন আপ সফল হয়নি।");
        return;
      }
      toast.success("সাইন আপ সফল হয়েছে");
      router.replace("/");
      router.refresh();
    } catch (err) {
      setError(`Authentication error: ${err instanceof Error ? err.message : "Unknown error"}`);
      toast.error("সাইন আপ সফল হয়নি।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f3f6f3] px-4 py-12">
      <header className="mb-8 max-w-md text-center">
        <h1 className="mb-2 text-3xl font-extrabold text-gray-800">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-sm text-gray-600">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </header>

      <section className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            <MdOutlineError className="shrink-0 text-lg" />
            <span>{error}</span>
          </div>
        )}

        <Form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">নাম</Label>
            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="email">ইমেইল</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password">পাসওয়ার্ড</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} minLength={8} required />
          </div>

          <Button type="submit" isDisabled={isLoading} className="mt-2 w-full bg-[#058240] text-white hover:bg-[#046c35]">
            {isLoading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </Button>
        </Form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-gray-500">অথবা</span></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="tertiary" isDisabled={isLoading} onClick={() => handleSocialAuth("google")} className="flex items-center justify-center gap-2 border border-gray-200 bg-white py-2 text-xs">
            <FcGoogle className="text-lg" /> Google
          </Button>
          <Button variant="tertiary" isDisabled={isLoading} onClick={() => handleSocialAuth("github")} className="flex items-center justify-center gap-2 border border-gray-200 bg-white py-2 text-xs">
            <FaGithub className="text-lg text-black" /> GitHub
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট আছে? <Link href="/sign-in" className="font-semibold text-[#058240] hover:underline">সাইন ইন করুন</Link>
        </div>
      </section>

      <footer className="mt-6 text-center">
        <Link href="/" className="text-xs text-gray-500 hover:text-gray-700">← হোম পেজে ফিরে যান</Link>
      </footer>
    </main>
  );
}