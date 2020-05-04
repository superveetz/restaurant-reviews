import store from '../store'

import { authenticateIfActiveSession } from '../store/auth/thunks'

store.dispatch<any>(authenticateIfActiveSession())
