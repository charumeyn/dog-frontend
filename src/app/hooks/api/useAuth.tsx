import { FailResult, SuccessResult } from "@/app/types/apiResult";
import { LoginDto } from "@/app/types/dto/login.dto";
import { RegisterDto } from "@/app/types/dto/register.dto";
import { User } from "@/app/types/user.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/app/queryKey/queryKeys";
import { Account } from "@/app/types/account.interface";


const register = async (dto: RegisterDto) => {
  const res = await fetch(`http://localhost:3000/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...dto
    })
  });

  const data = await res.json();
  return data;
}

const useRegister = (
  onRegisterSuccess: (data: SuccessResult<User>) => void,
  onRegisterError?: (error: FailResult) => void
) => {
  return useMutation((dto: RegisterDto) => register(dto), {
    onSuccess: (data: SuccessResult<User> | FailResult) => {
      if (!data.success) {
        if (onRegisterError) onRegisterError(data)
      } else {
        onRegisterSuccess(data)
      }
    },
    onError: (error: FailResult) => {
      if (onRegisterError) {
        onRegisterError(error);
      }
    },
  });
};

const login = async (dto: LoginDto) => {
  const res = await fetch(`http://localhost:3000/auth/login`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...dto
    })
  });

  const data = await res.json();
  return data;
}

const useLogin = (
  onLoginSuccess: (data: SuccessResult<User>) => void,
  onLoginError?: (error: FailResult) => void
) => {
  return useMutation((dto: LoginDto) => login(dto), {
    onSuccess: (data: SuccessResult<User> | FailResult) => {
      if (!data.success) {
        if (onLoginError) onLoginError(data)
      } else {
        onLoginSuccess(data)
      }
    },
    onError: (error: FailResult) => {
      if (onLoginError) {
        onLoginError(error);
      }
    },
  });
};

const getAccount = async () => {
  const res = await fetch(`http://localhost:3000/auth/account`, {
    credentials: 'include'
  });

  return res.json();
};

const useAccount = () => {
  return useQuery<SuccessResult<Account>>(
    queryKeys.account(),
    () => getAccount(),
  );
};

const logout = async () => {
  const res = await fetch(`http://localhost:3000/auth/logout`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();
  return data;
}

const useLogout = (
  onLogoutSuccess: () => void,
  onLogoutError?: () => void
) => {
  return useMutation(() => logout(), {
    onSuccess: (data: SuccessResult<User> | FailResult) => {
      if (!data.success) {
        if (onLogoutError) onLogoutError()
      } else {
        onLogoutSuccess()
      }
    },
    onError: (error: FailResult) => {
      if (onLogoutError) {
        onLogoutError();
      }
    },
  });
};

export { useRegister, useLogin, useAccount, useLogout }