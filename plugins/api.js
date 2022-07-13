import { AuthService, ControlService } from '~/services';
import FirebaseService from '~/services/FirebaseService';

/**
 * API factory of services
 */
const apiFactory = (firebaseService, app, store) => {
  /**
   * Define services here, it will be constructed later
   */
  const services = {
    authService: AuthService,
    controlService: ControlService,
  }

  /**
   * construct each service with own firebaseService instance
   */
  for (const [name, ServiceFactory] of Object.entries(services)) {
    const ownFirebaseService = firebaseService
    services[name] = ServiceFactory(ownFirebaseService, app, store)
  }

  return services
}

export default ({ app, store }, inject) => {
  const api = apiFactory(FirebaseService, app, store)
  inject('api', api)
}
