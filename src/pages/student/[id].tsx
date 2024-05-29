import { useRouter } from 'next/router'
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleStudent, setCurrentStudent } from '@/redux/studentSlice';
import { useEffect } from 'react';


export default function Home() {
    const router = useRouter()

    const dispatch: AppDispatch = useDispatch();
    const currentStudent = useSelector((state: RootState) => state.students.currentStudent);
    const idPart = router.query.id ? //is there an id param?
        Array.isArray(router.query.id) ? //is the param an array?
            router.query.id[0] : //grab the first portion of the array
            router.query.id //grab the whole param if its just a string
        : ""; //empty string if the param does not exist

    useEffect(() => {

        if (idPart) {
            dispatch(fetchSingleStudent(parseInt(idPart)));
        }
        return () => {
            dispatch(setCurrentStudent(null));
        };
    }, [router.query.id]);

    return (
        <>
            {currentStudent ?
                <div>
                    Profile for Student #{currentStudent?.id}
                    <br></br>
                    {currentStudent?.name}
                    <br></br>
                    {currentStudent?.email}
                </div> : <div>Loading</div>}

        </>
    );
}
