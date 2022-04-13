<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="jhipsterApp.beer.home.createOrEditLabel" data-cy="BeerCreateUpdateHeading">Create or edit a Beer</h2>
        <div>
          <div class="form-group" v-if="beer.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="beer.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="beer-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="beer-name"
              data-cy="name"
              :class="{ valid: !$v.beer.name.$invalid, invalid: $v.beer.name.$invalid }"
              v-model="$v.beer.name.$model"
            />
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.beer.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./beer-update.component.ts"></script>
