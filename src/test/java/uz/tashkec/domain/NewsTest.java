package uz.tashkec.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class NewsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(News.class);
        News news1 = new News();
        news1.setId(1L);
        News news2 = new News();
        news2.setId(news1.getId());
        assertThat(news1).isEqualTo(news2);
        news2.setId(2L);
        assertThat(news1).isNotEqualTo(news2);
        news1.setId(null);
        assertThat(news1).isNotEqualTo(news2);
    }
}
