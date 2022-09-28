package uz.tashkec.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.tashkec.repository.NewsRepository;
import uz.tashkec.service.NewsService;
import uz.tashkec.service.dto.NewsDTO;
import uz.tashkec.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.tashkec.domain.News}.
 */
@RestController
@RequestMapping("/api")
public class NewsResource {

    private final Logger log = LoggerFactory.getLogger(NewsResource.class);

    private static final String ENTITY_NAME = "news";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NewsService newsService;

    private final NewsRepository newsRepository;

    public NewsResource(NewsService newsService, NewsRepository newsRepository) {
        this.newsService = newsService;
        this.newsRepository = newsRepository;
    }

    /**
     * {@code POST  /news} : Create a new news.
     *
     * @param newsDTO the newsDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new newsDTO, or with status {@code 400 (Bad Request)} if the news has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/news")
    public ResponseEntity<NewsDTO> createNews(@RequestBody NewsDTO newsDTO) throws URISyntaxException {
        log.debug("REST request to save News : {}", newsDTO);
        if (newsDTO.getId() != null) {
            throw new BadRequestAlertException("A new news cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NewsDTO result = newsService.save(newsDTO);
        return ResponseEntity
            .created(new URI("/api/news/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /news/:id} : Updates an existing news.
     *
     * @param id the id of the newsDTO to save.
     * @param newsDTO the newsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated newsDTO,
     * or with status {@code 400 (Bad Request)} if the newsDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the newsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/news/{id}")
    public ResponseEntity<NewsDTO> updateNews(@PathVariable(value = "id", required = false) final Long id, @RequestBody NewsDTO newsDTO)
        throws URISyntaxException {
        log.debug("REST request to update News : {}, {}", id, newsDTO);
        if (newsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, newsDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!newsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        NewsDTO result = newsService.update(newsDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, newsDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /news/:id} : Partial updates given fields of an existing news, field will ignore if it is null
     *
     * @param id the id of the newsDTO to save.
     * @param newsDTO the newsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated newsDTO,
     * or with status {@code 400 (Bad Request)} if the newsDTO is not valid,
     * or with status {@code 404 (Not Found)} if the newsDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the newsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/news/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<NewsDTO> partialUpdateNews(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody NewsDTO newsDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update News partially : {}, {}", id, newsDTO);
        if (newsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, newsDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!newsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<NewsDTO> result = newsService.partialUpdate(newsDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, newsDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /news} : get all the news.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of news in body.
     */
    @GetMapping("/news")
    public List<NewsDTO> getAllNews() {
        log.debug("REST request to get all News");
        return newsService.findAll();
    }

    /**
     * {@code GET  /news/:id} : get the "id" news.
     *
     * @param id the id of the newsDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the newsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/news/{id}")
    public ResponseEntity<NewsDTO> getNews(@PathVariable Long id) {
        log.debug("REST request to get News : {}", id);
        Optional<NewsDTO> newsDTO = newsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(newsDTO);
    }

    /**
     * {@code DELETE  /news/:id} : delete the "id" news.
     *
     * @param id the id of the newsDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/news/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        log.debug("REST request to delete News : {}", id);
        newsService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
