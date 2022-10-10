package uz.tashkec.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Партнеры
 */
@Entity
@Table(name = "partner")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Partner implements Serializable {

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

    @Size(max = 1024)
    @Column(name = "web_url", length = 1024)
    private String webUrl;

    @Size(max = 256)
    @Column(name = "youtube_url", length = 256)
    private String youtubeUrl;

    @OneToOne
    @JoinColumn(unique = true)
    private Attachment attachment;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Partner id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitleUz() {
        return this.titleUz;
    }

    public Partner titleUz(String titleUz) {
        this.setTitleUz(titleUz);
        return this;
    }

    public void setTitleUz(String titleUz) {
        this.titleUz = titleUz;
    }

    public String getTitleRu() {
        return this.titleRu;
    }

    public Partner titleRu(String titleRu) {
        this.setTitleRu(titleRu);
        return this;
    }

    public void setTitleRu(String titleRu) {
        this.titleRu = titleRu;
    }

    public String getTitleKr() {
        return this.titleKr;
    }

    public Partner titleKr(String titleKr) {
        this.setTitleKr(titleKr);
        return this;
    }

    public void setTitleKr(String titleKr) {
        this.titleKr = titleKr;
    }

    public String getWebUrl() {
        return this.webUrl;
    }

    public Partner webUrl(String webUrl) {
        this.setWebUrl(webUrl);
        return this;
    }

    public void setWebUrl(String webUrl) {
        this.webUrl = webUrl;
    }

    public String getYoutubeUrl() {
        return this.youtubeUrl;
    }

    public Partner youtubeUrl(String youtubeUrl) {
        this.setYoutubeUrl(youtubeUrl);
        return this;
    }

    public void setYoutubeUrl(String youtubeUrl) {
        this.youtubeUrl = youtubeUrl;
    }

    public Attachment getAttachment() {
        return this.attachment;
    }

    public void setAttachment(Attachment attachment) {
        this.attachment = attachment;
    }

    public Partner attachment(Attachment attachment) {
        this.setAttachment(attachment);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Partner)) {
            return false;
        }
        return id != null && id.equals(((Partner) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Partner{" +
            "id=" + getId() +
            ", titleUz='" + getTitleUz() + "'" +
            ", titleRu='" + getTitleRu() + "'" +
            ", titleKr='" + getTitleKr() + "'" +
            ", webUrl='" + getWebUrl() + "'" +
            ", youtubeUrl='" + getYoutubeUrl() + "'" +
            "}";
    }
}
