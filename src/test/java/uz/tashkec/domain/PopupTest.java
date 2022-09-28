package uz.tashkec.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class PopupTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Popup.class);
        Popup popup1 = new Popup();
        popup1.setId(1L);
        Popup popup2 = new Popup();
        popup2.setId(popup1.getId());
        assertThat(popup1).isEqualTo(popup2);
        popup2.setId(2L);
        assertThat(popup1).isNotEqualTo(popup2);
        popup1.setId(null);
        assertThat(popup1).isNotEqualTo(popup2);
    }
}
