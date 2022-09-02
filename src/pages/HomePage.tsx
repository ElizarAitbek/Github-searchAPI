import { useEffect, useState } from 'react';
import { RepoCard } from '../components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api'

export const HomePage = () => {

	const [search, setSearch] = useState('')
	const [dropdown, setDropdown] = useState(false);


	const debounced = useDebounce(search)

	const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
		skip: debounced.length < 3,
		refetchOnFocus: true
	});

	const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery();

	useEffect(() => {
		setDropdown(debounced.length > 3 && data?.length! > 0)

	}, [debounced]);

	const clickHandler = (username: string) => {
		fetchRepos(username)
		setDropdown(false)
	}


	return (
		<div className='flex justify-center p-10 mx-auto h-screen w-screen'>
			{isError && <p className='text-center text-red-600'>Something went wrong!</p>}

			<div className="relative w-[560px]">
				<input
					type='text'
					className='border py-2 px-4 w-full h-[42px] mb-2'
					placeholder='github username...'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>

				{
					dropdown && <ul className='list-none absolute top-[42px] left-0 overflow-y-scroll right-0 max-h-[200px] shadow-md bg-white'>
						{isLoading && <p className='text-center'>Loading...</p>}

						{data?.map(user => (
							<li
								onClick={() => clickHandler(user.login)}
								key={user.id}
								className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
							>{user.login}</li>
						))}

					</ul>
				}

				<div className="container">
					{areReposLoading && <p className='text-center'>Repos are loading...</p>}
					{ repos?.map(repo => <RepoCard repo={repo} key={repo.id}/>) }
				</div>
			</div>


		</div>
	)
}
