import UserForm from '@/features/user/create-user-form';

export default async function AddUserPage() {
  return (
    <div>
      <UserForm initialData={null} pageTitle={'Register User'} />
    </div>
  );
}
