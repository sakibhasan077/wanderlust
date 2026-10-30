"use client"; // for convert server component to client component

import { useState } from "react"; // for state
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"; // for icon
import { Button } from "@/components/ui/button"; // for button
import { Field, FieldError, FieldLabel } from "@/components/ui/field"; // for error field
import { Input } from "@/components/ui/input"; // for input field
import { signUp } from "@/lib/auth-client";

type FieldName = "name" | "email" | "password" | "confirmPassword"; // understood
type FieldErrors = Partial<Record<FieldName, string>>; // Partial -> optional, Record -> define key: value type

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/; // Email Validation
const MIN_PASSWORD_LENGTH = 8; // for password length
const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const NUMBER_REGEX = /[0-9]/;

// Shared class string so every input looks the same (matches the app's form style).
const inputClass =
  "h-10 rounded-md border-zinc-200 bg-zinc-100 pl-10 text-sm text-zinc-800 placeholder:text-zinc-400 focus-visible:border-brand focus-visible:bg-white";

// Validates the submitted values and returns a map of field -> error message.
function validate(data: Record<string, string>): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name?.trim()) {
    errors.name = "Full name is required";
  } else if (data.name.length < 3) {
    errors.name = "Name must be 3 character";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  } else if (!UPPERCASE_REGEX.test(data.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  }else if (!LOWERCASE_REGEX.test(data.password)) {
    errors.password = "Password must contain at least one lowercase letter";
  }else if (!NUMBER_REGEX.test(data.password)) {
    errors.password = "Password must contain at least one number";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

interface PasswordInputProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  error?: string;
  onValueChange: () => void;
}

// Password field with a show/hide toggle button.
function PasswordInput({
  id,
  name,
  label,
  placeholder,
  error,
  onValueChange,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Field data-invalid={error ? "true" : undefined}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Lock
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
          aria-hidden="true"
        />
        <Input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          required
          aria-invalid={!!error}
          onChange={onValueChange}
          className={`${inputClass} pr-10`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-700"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      <FieldError>{error}</FieldError>
    </Field>
  );
}

const SignUpForm = () => {
  // Per-field validation messages; a field with no entry renders no error.
  const [errors, setErrors] = useState<FieldErrors>({});

  // Clears a field's error as soon as the user edits it.
  const clearError = (field: FieldName) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formTarget = e.currentTarget
    const formData = new FormData(formTarget);
    const userData = Object.fromEntries(formData.entries()) as {name:string,email:string,password:string,confirmPassword?:string};

    const nextErrors = validate(userData);
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return;
    console.log(userData);
    try{
      await signUp.email(
      {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }
    )
    }catch(err){
      console.log(err);
    }
    formTarget.reset();
    // const {data,error} = await signUp.email(
    //   {
    //     ...userData
    //   }
    // )
    // console.log(data);
  }; // pending

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Full Name */}
      <Field data-invalid={errors.name ? "true" : undefined}>
        <FieldLabel htmlFor="name">Full Name</FieldLabel>
        <div className="relative">
          <User
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
            aria-hidden="true"
          />
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
            aria-invalid={!!errors.name}
            onChange={() => clearError("name")}
            className={inputClass}
          />
        </div>
        <FieldError>{errors.name}</FieldError>
      </Field>

      {/* Email Address */}
      <Field data-invalid={errors.email ? "true" : undefined}>
        <FieldLabel htmlFor="email">Email Address</FieldLabel>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
            aria-hidden="true"
          />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            aria-invalid={!!errors.email}
            onChange={() => clearError("email")}
            className={inputClass}
          />
        </div>
        <FieldError>{errors.email}</FieldError>
      </Field>

      {/* Password */}
      <PasswordInput
        id="password"
        name="password"
        label="Password"
        placeholder="Create a password"
        error={errors.password}
        onValueChange={() => clearError("password")}
      />

      {/* Confirm Password */}
      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        error={errors.confirmPassword}
        onValueChange={() => clearError("confirmPassword")}
      />

      {/* TODO (logic): disable while loading and swap the label,
          e.g. {loading ? "Creating Account..." : "Create Account"} */}
      <Button
        type="submit"
        className="h-10 w-full bg-brand text-white hover:bg-brand/90"
      >
        Create Account
      </Button>
    </form>
  );
};

export default SignUpForm;
