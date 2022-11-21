import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function UserItem({ user: { login, avatar_url } }) {
  return (
    <div className='card shadow-md compact side bg-base-100'>
      <div>
        <div className="avatar">
          <div className="rounded-full shadow w-14 h-14">
            <img src={avatar_url} alt="Profilie" />
          </div>
        </div>
      </div>
      <div>
        <h2 className="card-title">{login}</h2>
        <Link className='text-base-content text-opacity-40' to={`/users/${login}`}>
          Visit Profile
        </Link>

      </div>
      <div className="flex-row items-center sapce-x-4 car-body">

      </div>
    </div>
  )
}


UserItem.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserItem
