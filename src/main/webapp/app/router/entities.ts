import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Beer = () => import('@/entities/beer/beer.vue');
// prettier-ignore
const BeerUpdate = () => import('@/entities/beer/beer-update.vue');
// prettier-ignore
const BeerDetails = () => import('@/entities/beer/beer-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'beer',
      name: 'Beer',
      component: Beer,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'beer/new',
      name: 'BeerCreate',
      component: BeerUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'beer/:beerId/edit',
      name: 'BeerEdit',
      component: BeerUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'beer/:beerId/view',
      name: 'BeerView',
      component: BeerDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
