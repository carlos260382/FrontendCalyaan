/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import styles from '../style/UserEditScreen.module.css';

export default function UserEditScreen(props) {
	const userId = props.match.params.id;
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isSeller, setIsSeller] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	const userDetails = useSelector(state => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector(state => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	const dispatch = useDispatch();
	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			props.history.push('/userlist');
		}
		if (!user) {
			dispatch(detailsUser(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setIsSeller(user.isSeller);
			setIsAdmin(user.isAdmin);
		}
		// eslint-disable-next-line react/prop-types
	}, [dispatch, props.history, successUpdate, user, userId]);

	const submitHandler = e => {
		e.preventDefault();
		// dispatch update user
		dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
	};
	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={submitHandler}>
				<div>
					<h1>Editar Usuario {name}</h1>
					{loadingUpdate && <LoadingBox></LoadingBox>}
					{errorUpdate && (
						<MessageBox variant='danger'>{errorUpdate}</MessageBox>
					)}
				</div>
				{loading ? (
					<LoadingBox />
				) : error ? (
					<MessageBox variant='danger'>{error}</MessageBox>
				) : (
					<>
						<div>
							<label htmlFor='name'>Nombre</label>
							<input
								id='name'
								type='text'
								placeholder='Enter name'
								value={name}
								onChange={e => setName(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor='email'>Correo Electronico</label>
							<input
								id='email'
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							></input>
						</div>
						<div>
							<label htmlFor='isSeller'>Es vendedor</label>
							<input
								id='isSeller'
								type='checkbox'
								checked={isSeller}
								onChange={e => setIsSeller(e.target.checked)}
							></input>
						</div>
						<div>
							<label htmlFor='isAdmin'>Es administrador</label>
							<input
								id='isAdmin'
								type='checkbox'
								checked={isAdmin}
								onChange={e => setIsAdmin(e.target.checked)}
							></input>
						</div>
						<div>
							<button type='submit'>Actualizar</button>
						</div>
					</>
				)}
			</form>
		</div>
	);
}
