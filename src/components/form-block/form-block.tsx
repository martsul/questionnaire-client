import { FC, ReactElement } from "react"

type Props = {children: ReactElement}

export const FormBlock: FC<Props> = ({children}) => {
    return <div>{children}</div>
}