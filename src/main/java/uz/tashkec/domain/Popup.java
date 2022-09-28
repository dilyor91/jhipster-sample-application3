package uz.tashkec.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Popup.
 */
@Entity
@Table(name = "popup")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Popup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "is_image")
    private Boolean isImage;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "redirect_url")
    private String redirectUrl;

    @OneToOne
    @JoinColumn(unique = true)
    private Attachment attachment;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Popup id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getIsImage() {
        return this.isImage;
    }

    public Popup isImage(Boolean isImage) {
        this.setIsImage(isImage);
        return this;
    }

    public void setIsImage(Boolean isImage) {
        this.isImage = isImage;
    }

    public String getVideoUrl() {
        return this.videoUrl;
    }

    public Popup videoUrl(String videoUrl) {
        this.setVideoUrl(videoUrl);
        return this;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getRedirectUrl() {
        return this.redirectUrl;
    }

    public Popup redirectUrl(String redirectUrl) {
        this.setRedirectUrl(redirectUrl);
        return this;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public Attachment getAttachment() {
        return this.attachment;
    }

    public void setAttachment(Attachment attachment) {
        this.attachment = attachment;
    }

    public Popup attachment(Attachment attachment) {
        this.setAttachment(attachment);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Popup)) {
            return false;
        }
        return id != null && id.equals(((Popup) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Popup{" +
            "id=" + getId() +
            ", isImage='" + getIsImage() + "'" +
            ", videoUrl='" + getVideoUrl() + "'" +
            ", redirectUrl='" + getRedirectUrl() + "'" +
            "}";
    }
}
