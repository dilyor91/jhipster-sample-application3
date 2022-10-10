package uz.tashkec.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Культура Кореи
 */
@Entity
@Table(name = "korean_culture")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class KoreanCulture implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Size(max = 1024)
    @Column(name = "title_uz", length = 1024)
    private String titleUz;

    @Size(max = 1024)
    @Column(name = "title_ru", length = 1024)
    private String titleRu;

    @Size(max = 1024)
    @Column(name = "title_kr", length = 1024)
    private String titleKr;

    @Size(max = 4000)
    @Column(name = "content_uz", length = 4000)
    private String contentUz;

    @Size(max = 4000)
    @Column(name = "content_ru", length = 4000)
    private String contentRu;

    @Size(max = 4000)
    @Column(name = "content_kr", length = 4000)
    private String contentKr;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public KoreanCulture id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitleUz() {
        return this.titleUz;
    }

    public KoreanCulture titleUz(String titleUz) {
        this.setTitleUz(titleUz);
        return this;
    }

    public void setTitleUz(String titleUz) {
        this.titleUz = titleUz;
    }

    public String getTitleRu() {
        return this.titleRu;
    }

    public KoreanCulture titleRu(String titleRu) {
        this.setTitleRu(titleRu);
        return this;
    }

    public void setTitleRu(String titleRu) {
        this.titleRu = titleRu;
    }

    public String getTitleKr() {
        return this.titleKr;
    }

    public KoreanCulture titleKr(String titleKr) {
        this.setTitleKr(titleKr);
        return this;
    }

    public void setTitleKr(String titleKr) {
        this.titleKr = titleKr;
    }

    public String getContentUz() {
        return this.contentUz;
    }

    public KoreanCulture contentUz(String contentUz) {
        this.setContentUz(contentUz);
        return this;
    }

    public void setContentUz(String contentUz) {
        this.contentUz = contentUz;
    }

    public String getContentRu() {
        return this.contentRu;
    }

    public KoreanCulture contentRu(String contentRu) {
        this.setContentRu(contentRu);
        return this;
    }

    public void setContentRu(String contentRu) {
        this.contentRu = contentRu;
    }

    public String getContentKr() {
        return this.contentKr;
    }

    public KoreanCulture contentKr(String contentKr) {
        this.setContentKr(contentKr);
        return this;
    }

    public void setContentKr(String contentKr) {
        this.contentKr = contentKr;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KoreanCulture)) {
            return false;
        }
        return id != null && id.equals(((KoreanCulture) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KoreanCulture{" +
            "id=" + getId() +
            ", titleUz='" + getTitleUz() + "'" +
            ", titleRu='" + getTitleRu() + "'" +
            ", titleKr='" + getTitleKr() + "'" +
            ", contentUz='" + getContentUz() + "'" +
            ", contentRu='" + getContentRu() + "'" +
            ", contentKr='" + getContentKr() + "'" +
            "}";
    }
}
