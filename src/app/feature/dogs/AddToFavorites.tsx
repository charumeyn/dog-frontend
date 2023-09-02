import { IconClose, IconHeart, IconHeartSolid } from "@/app/components/layout/Icons";
import { useUpdateFavorites } from "@/app/hooks/api/useAuth";
import { UpdateFavoritesDto, User } from "@/app/types/user.interface";
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
    return favoriteDogIds.some(id => Number(id) === Number(dogId));
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

    //@ts-ignore
    if (list.indexOf(String(dogId)) >= 0) {
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
    <div className="mt-3">
      {account.id ?
        existingId ?
          <div className="flex gap-x-4 justify-center">
            <div className="flex gap-x-2 justify-center text-sm hover:cursor-pointer text-orange-600">
              <IconHeartSolid className="w-4 w-5 text-orange-600" />Added to favorites
            </div>
            <div className="flex gap-x-2 justify-center text-sm hover:cursor-pointer border-l border-zinc-200 text-zinc-400 pl-4 font-normal"
              onClick={() => handleDelete()}>
              <IconClose className="w-4 w-5" />Remove
            </div>
          </div> :
          <div className="flex gap-x-2 justify-center text-zinc-500 text-sm hover:cursor-pointer"
            onClick={(e) => handleUpdate(e)}>
            <IconHeart className="w-4 w-5" />Add to favorites
          </div> :
        <a className="flex gap-x-2 justify-center text-zinc-500 text-sm hover:cursor-pointer"
          href="/login">
          <IconHeart className="w-4 w-5" />Add to favorites
        </a>
      }
    </div>
  )
}