import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBeer } from '@/shared/model/beer.model';
import BeerService from './beer.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class BeerDetails extends Vue {
  @Inject('beerService') private beerService: () => BeerService;
  @Inject('alertService') private alertService: () => AlertService;

  public beer: IBeer = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.beerId) {
        vm.retrieveBeer(to.params.beerId);
      }
    });
  }

  public retrieveBeer(beerId) {
    this.beerService()
      .find(beerId)
      .then(res => {
        this.beer = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
