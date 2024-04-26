import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { deleteProfile } from './actions';

export default async function DeleteProfile() {
  return (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>Delete Profile</CardTitle>
        <CardDescription>This action cannot be undone.</CardDescription>
        <CardDescription>
          This deletes only credentials passt after registation. For full
          deletion contact support
        </CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <form action={deleteProfile}>
          <Button variant='destructive' type='submit'>
            Delete Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
