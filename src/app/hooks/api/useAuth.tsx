import { FailResult, SuccessResult } from "@/app/types/apiResult";
import { LoginDto } from "@/app/types/dto/login.dto";
import { RegisterDto } from "@/app/types/dto/register.dto";
import { UpdateFavoritesDto, UpdateUserDto, User } from "@/app/types/user.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

  const queryClient = useQueryClient()

  return useMutation((dto: LoginDto) => login(dto), {
    onSuccess: (data: SuccessResult<User> | FailResult) => {
      if (!data.success) {
        if (onLoginError) onLoginError(data)
      } else {
        queryClient.invalidateQueries(['account'])
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
  return useQuery<User>(
    queryKeys.account(),
    () => getAccount(),
  );
};

const getAccountById = async (id: number) => {
  const res = await fetch(`http://localhost:3000/accounts/${id}`, {
    credentials: 'include'
  });

  return res.json();
};

const useAccountById = (id: number) => {
  return useQuery<User>(
    queryKeys.accountId(id),
    () => getAccountById(id),
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

  const queryClient = useQueryClient()

  return useMutation(() => logout(), {
    onSuccess: (data: SuccessResult<User> | FailResult) => {
      if (!data.success) {
        if (onLogoutError) onLogoutError()
      } else {
        queryClient.invalidateQueries(['account'])
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

const updateUser = async (dto: UpdateUserDto) => {

  const { id, ...bodyWithoutId } = dto;

  const res = await fetch(`http://localhost:3000/account/${dto.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...bodyWithoutId
    })
  });

  const data = await res.json();
  return data;
}

const useUpdateUser = (
  onUpdateSuccess: () => void,
  onUpdateError?: (error: FailResult) => void
) => {
  return useMutation((dto: UpdateUserDto) => updateUser(dto), {
    onSuccess: (data: SuccessResult<User> | FailResult) => {
      if (!data.success) {
        if (onUpdateError) onUpdateError(data)
      } else {
        onUpdateSuccess()
      }
    },
    onError: (error: FailResult) => {
      if (onUpdateError) {
        onUpdateError(error);
      }
    },
  });
};

const getAccounts = async () => {
  const res = await fetch(`http://localhost:3000/accounts`);

  return res.json();
};

const useAccounts = () => {
  return useQuery<User[]>(
    queryKeys.accounts(),
    () => getAccounts(),
  );
};

const updateFavorites = async (dto: UpdateFavoritesDto) => {

  // const { id, ...bodyWithoutId } = dto;

  const res = await fetch(`http://localhost:3000/account/${dto.id}/update-favorites`, {
    method: 'PATCH',
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

const useUpdateFavorites = (
  onUpdateSuccess: () => void,
  onUpdateError?: (error: FailResult) => void
) => {
  const queryClient = useQueryClient()

  return useMutation((dto: UpdateFavoritesDto) => updateFavorites(dto), {
    onSuccess: (data: SuccessResult<User> | FailResult) => {
      if (!data.success) {
        if (onUpdateError) onUpdateError(data)
      } else {
        queryClient.invalidateQueries(['account'])
        onUpdateSuccess()
      }
    },
    onError: (error: FailResult) => {
      if (onUpdateError) {
        onUpdateError(error);
      }
    },
  });
};



export { useRegister, useLogin, useAccount, useLogout, useUpdateUser, useAccounts, useAccountById, useUpdateFavorites }