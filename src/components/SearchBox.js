/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styles from '../style/SearchBox.module.css';
import lupa from '../assent/lupa.png';

export default function SearchBox(props) {
	const [name, setName] = useState('');
	const submitHandler = e => {
		e.preventDefault();
		props.history.push(`/search/name/${name}`);
	};
	return (
		<form onSubmit={submitHandler}>
			<div className={styles.search}>
				<div className={styles.SearchBox}>
					<input
						type='text'
						placeholder='Buscar servicios'
						name='q'
						onChange={e => setName(e.target.value)}
						className={styles.input}
					></input>
					<button className={styles.btnSearch} type='submit'>
						<img src={lupa} />
					</button>
				</div>
			</div>
		</form>
	);
}
