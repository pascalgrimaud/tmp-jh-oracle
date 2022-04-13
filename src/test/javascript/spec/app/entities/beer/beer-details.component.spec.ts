/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import BeerDetailComponent from '@/entities/beer/beer-details.vue';
import BeerClass from '@/entities/beer/beer-details.component';
import BeerService from '@/entities/beer/beer.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Beer Management Detail Component', () => {
    let wrapper: Wrapper<BeerClass>;
    let comp: BeerClass;
    let beerServiceStub: SinonStubbedInstance<BeerService>;

    beforeEach(() => {
      beerServiceStub = sinon.createStubInstance<BeerService>(BeerService);

      wrapper = shallowMount<BeerClass>(BeerDetailComponent, {
        store,
        localVue,
        router,
        provide: { beerService: () => beerServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundBeer = { id: 123 };
        beerServiceStub.find.resolves(foundBeer);

        // WHEN
        comp.retrieveBeer(123);
        await comp.$nextTick();

        // THEN
        expect(comp.beer).toBe(foundBeer);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundBeer = { id: 123 };
        beerServiceStub.find.resolves(foundBeer);

        // WHEN
        comp.beforeRouteEnter({ params: { beerId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.beer).toBe(foundBeer);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
