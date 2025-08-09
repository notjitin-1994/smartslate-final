import { StackHandler, StackServerApp } from '@stackframe/stack';

const app = new StackServerApp({
  projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
  secretServerKey: process.env.STACK_SECRET_SERVER_KEY!,
});

export default function Handler(props: any) {
  return <StackHandler fullPage app={app} routeProps={props} />;
}


