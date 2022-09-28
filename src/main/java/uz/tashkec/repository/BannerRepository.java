package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.Banner;

/**
 * Spring Data JPA repository for the Banner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {}
