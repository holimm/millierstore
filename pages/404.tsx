import { Button, Result } from "antd";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href="/">
            <Button type="default">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default Custom404;
