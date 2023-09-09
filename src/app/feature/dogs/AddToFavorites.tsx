import { IconClose, IconHeart, IconHeartSolid } from "@/app/components/layout/Icons";
import { useUpdateFavorites } from "@/app/hooks/api/useAuth";
import { UpdateFavoritesDto, User, UserType } from "@/app/types/user.interface";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function AddToFavorites({ account, dogId }: { account: User, dogId: number }) {

  const onSuccess = () => { }
  const onError = () => { }

  const { mutate: updateFavorites } = useUpdateFavorites(onSuccess, onError)

  const [favoriteDogIds, setFavoriteDogIds] = useState<number[]>([])

  useEffect(() => {
    if (account.id) {
      setFavoriteDogIds(account.favoriteDogIds)
    }
  }, [setFavoriteDogIds, account])

  const existingId = useMemo(() => {
    if (account.id && favoriteDogIds) {
      return favoriteDogIds.some(id => Number(id) === Number(dogId))
    }
  }, [favoriteDogIds]);

  const handleUpdate = useCallback((e: any) => {
    e.preventDefault();

    if (account.id) {
      if (!existingId) {
        const body: UpdateFavoritesDto = {
          id: account?.id,
          favoriteDogIds: [...favoriteDogIds, dogId]
        }
        updateFavorites(body)
        setFavoriteDogIds([...favoriteDogIds, dogId])
      }
    }
  }, [account, favoriteDogIds, setFavoriteDogIds])


  const handleDelete = useCallback(() => {
    const list = [...favoriteDogIds]

    if (list.indexOf(dogId) >= 0) {
      const filtered = list.filter(id => Number(id) !== Number(dogId))

      const body: UpdateFavoritesDto = {
        id: account?.id,
        favoriteDogIds: filtered
      }

      updateFavorites(body)
      setFavoriteDogIds(filtered)
    }
  }, [setFavoriteDogIds, favoriteDogIds])

  return (
    account.id ?
      <>{account.type === UserType.User ?
        existingId ?
          <div className="flex gap-x-4 justify-center mt-3">
            <div className="flex gap-x-2 justify-center text-sm hover:cursor-pointer text-orange-600">
              <IconHeartSolid className="w-4 w-5 text-orange-600" />Added to favorites
            </div>
            <div className="flex gap-x-2 justify-center text-sm hover:cursor-pointer border-l border-zinc-200 text-zinc-400 pl-4 font-normal"
              onClick={() => handleDelete()}>
              <IconClose className="w-4 w-5" />Remove
            </div>
          </div> :

          <div className="flex gap-x-2 justify-center text-zinc-500 text-sm hover:cursor-pointer  mt-3"
            onClick={(e) => handleUpdate(e)}>
            <IconHeart className="w-4 w-5" />Add to favorites
          </div> : null}
      </> :

      <a className="flex gap-x-2 justify-center text-zinc-500 text-sm hover:cursor-pointer  mt-3"
        href="/login">
        <IconHeart className="w-4 w-5" />Add to favorites
      </a>
  )
}