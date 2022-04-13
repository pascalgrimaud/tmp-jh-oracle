import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import { IBeer, Beer } from '@/shared/model/beer.model';
import BeerService from './beer.service';

const validations: any = {
  beer: {
    name: {},
  },
};

@Component({
  validations,
})
export default class BeerUpdate extends Vue {
  @Inject('beerService') private beerService: () => BeerService;
  @Inject('alertService') private alertService: () => AlertService;

  public beer: IBeer = new Beer();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.beerId) {
        vm.retrieveBeer(to.params.beerId);
      }
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.beer.id) {
      this.beerService()
        .update(this.beer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Beer is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.beerService()
        .create(this.beer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Beer is created with identifier ' + param.id;
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveBeer(beerId): void {
    this.beerService()
      .find(beerId)
      .then(res => {
        this.beer = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
