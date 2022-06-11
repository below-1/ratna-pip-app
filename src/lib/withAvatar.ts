type T = { id: string }

export default function withAvatar(item: T): T | { avatar: string } {
  const avatar = `https://avatars.dicebear.com/api/human/${item.id}.svg`
  return {
    ...item,
    avatar
  }
}
