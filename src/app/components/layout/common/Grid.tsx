import { ReactNode, useMemo } from "react";

type GridProps = {
  columns: number;
  className?: string;
  content: ReactNode;
}

const Grid: React.FunctionComponent<GridProps> = ({ columns, className, content }) => {

  const gap = useMemo(() => {
    switch (columns) {
      case 2:
        return 'gap-5';
      case 3:
        return 'gap-5';
      case 4:
        return 'gap-8';
      default:
        return 'gap-4';
    }
  }, [])

  return (
    <div className={`${className ? className : ""} grid grid-cols-${columns} ${gap} `}>
      {content}
    </div>
  )
}

export default Grid;