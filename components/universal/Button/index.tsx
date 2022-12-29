import Link from "next/link"
import styles from "./index.module.css"

interface IButtonProps {
  href: string
  text: string
  className?: string
  style?: React.CSSProperties
}

export const Button: React.FC<IButtonProps> = (props) => {
  return (
    <Link href={props.href} className={`${styles.button} ${props.className || ``}`} style={props.style}>
      <span>
        {props.text}
      </span>
    </Link>
  )
}