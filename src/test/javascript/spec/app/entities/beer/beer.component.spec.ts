/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import BeerComponent from '@/entities/beer/beer.vue';
import BeerClass from '@/entities/beer/beer.component';
import BeerService from '@/entities/beer/beer.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Beer Management Component', () => {
    let wrapper: Wrapper<BeerClass>;
    let comp: BeerClass;
    let beerServiceStub: SinonStubbedInstance<BeerService>;

    beforeEach(() => {
      beerServiceStub = sinon.createStubInstance<BeerService>(BeerService);
      beerServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<BeerClass>(BeerComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          beerService: () => beerServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      beerServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllBeers();
      await comp.$nextTick();

      // THEN
      expect(beerServiceStub.retrieve.called).toBeTruthy();
      expect(comp.beers[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      beerServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(beerServiceStub.retrieve.callCount).toEqual(1);

      comp.removeBeer();
      await comp.$nextTick();

      // THEN
      expect(beerServiceStub.delete.called).toBeTruthy();
      expect(beerServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
