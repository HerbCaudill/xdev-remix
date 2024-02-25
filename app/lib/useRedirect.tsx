export function useRedirect({ from, to }: { from: string; to: string }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    console.log({ from, to, pathname })
    if (pathname === from) navigate(to)
  }, [pathname])
}
