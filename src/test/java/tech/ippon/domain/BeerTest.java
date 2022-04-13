package tech.ippon.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import tech.ippon.web.rest.TestUtil;

class BeerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Beer.class);
        Beer beer1 = new Beer();
        beer1.setId(1L);
        Beer beer2 = new Beer();
        beer2.setId(beer1.getId());
        assertThat(beer1).isEqualTo(beer2);
        beer2.setId(2L);
        assertThat(beer1).isNotEqualTo(beer2);
        beer1.setId(null);
        assertThat(beer1).isNotEqualTo(beer2);
    }
}
