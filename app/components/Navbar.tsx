import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface NavbarProps {
  username: string
  onLogout: () => void
}

export function Navbar({ username, onLogout }: NavbarProps) {
  const router = useRouter()

  const handleLogout = () => {
    onLogout()
    router.push("/")
  }

  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-lg font-bold">Generator Project <small>(using AI)</small></span>
        <div className="flex items-center space-x-4">
          <span>Olá, {username}</span>
          <Button variant="secondary" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>
    </nav>
  )
}

