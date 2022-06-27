import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from './firebase.init';
import ProfileForm from './ProfileForm';
import ProfileUpdateForm from './ProfileUpdateForm';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const { isLoading, data: profile, refetch } = useQuery(['profile'], () =>
      fetch(`https://mighty-ridge-59560.herokuapp.com/profile?email=${user?.email}`).then(res =>
        res.json()
      )
    )
    if (isLoading) {
      return  <div className='flex justify-center mt-32'><button class="btn btn-square loading"></button></div>
    }
  
    if (profile[0]) {
      const { education, location, number, linkDin } = profile[0];
      return <div>
        <h1 className='text-xl font-bold text-blue-900'>Update Your Profile</h1>
        <div className='grid lg:grid-cols-2'>
          <ProfileUpdateForm refetch={refetch} profile={profile}>Update Profile</ProfileUpdateForm>
          <div className='p-4 '>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                
                <p className='text-xl font-bold'>Email: {user?.email}</p>
                <h2 className="card-title">Education: {education}</h2>
                <p className='text-xl'>Location: {location}</p>
                <p className='text-xl'>Number: {number}</p>
                <p className='text-xl'>LinkDin Profile: <a className='text-blue-700 font-bold' target='_blank' rel='noreferrer' href={linkDin}>{linkDin}</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    return (
      <div>
        <h1 className='text-xl font-bold text-blue-900'>Add Your Profile </h1>
        <div className='grid lg:grid-cols-2'>
          <div className='sm:space-y-reverse'>
            <ProfileForm profile={profile} refetch={refetch}>Add Profile</ProfileForm>
          </div>
        </div>
      </div>
    )
};

export default MyProfile;