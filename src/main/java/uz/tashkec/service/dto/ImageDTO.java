package uz.tashkec.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.tashkec.domain.Image} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ImageDTO implements Serializable {

    private Long id;

    private String orginalName;

    private String name;

    private String imageData;

    private Boolean mainlyPhoto;

    private AlbumDTO image;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrginalName() {
        return orginalName;
    }

    public void setOrginalName(String orginalName) {
        this.orginalName = orginalName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageData() {
        return imageData;
    }

    public void setImageData(String imageData) {
        this.imageData = imageData;
    }

    public Boolean getMainlyPhoto() {
        return mainlyPhoto;
    }

    public void setMainlyPhoto(Boolean mainlyPhoto) {
        this.mainlyPhoto = mainlyPhoto;
    }

    public AlbumDTO getImage() {
        return image;
    }

    public void setImage(AlbumDTO image) {
        this.image = image;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ImageDTO)) {
            return false;
        }

        ImageDTO imageDTO = (ImageDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, imageDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ImageDTO{" +
            "id=" + getId() +
            ", orginalName='" + getOrginalName() + "'" +
            ", name='" + getName() + "'" +
            ", imageData='" + getImageData() + "'" +
            ", mainlyPhoto='" + getMainlyPhoto() + "'" +
            ", image=" + getImage() +
            "}";
    }
}
